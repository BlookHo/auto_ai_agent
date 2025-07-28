class GeminiClient < BaseLlmClient
  def initialize
    require 'httparty'
    @api_key = ENV['GEMINI_API_KEY']
    @api_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent'
  end

  def generate_response(prompt)
    sanitized_prompt = sanitize_prompt(prompt)

    begin
      response = HTTParty.post(
        "#{@api_url}?key=#{@api_key}",
        headers: {
          'Content-Type' => 'application/json'
        },
        body: {
          contents: [
            {
              role: 'user',
              parts: [
                { text: sanitized_prompt }
              ]
            }
          ],
          systemInstruction: {
            parts: [
              { text: "You are an expert automotive diagnostic system. Provide detailed, accurate analysis of car problems based on symptoms, vehicle specifications, and maintenance history." }
            ]
          },
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1000,
            topP: 0.8,
            topK: 40
          }
        }.to_json
      )

      if response.code == 200
        JSON.parse(response.body)['candidates'][0]['content']['parts'][0]['text']
      else
        handle_api_error(StandardError.new("API returned status code #{response.code}: #{response.body}"))
      end
    rescue => e
      handle_api_error(e)
    end
  end
end
