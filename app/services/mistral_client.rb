class MistralClient < BaseLlmClient
  def initialize
    require 'httparty'
    @api_key = ENV['MISTRAL_API_KEY']
    @api_url = 'https://api.mistral.ai/v1/chat/completions'
  end

  def generate_response(prompt)
    sanitized_prompt = sanitize_prompt(prompt)

    begin
      response = HTTParty.post(
        @api_url,
        headers: {
          'Content-Type' => 'application/json',
          'Authorization' => "Bearer #{@api_key}"
        },
        body: {
          model: 'mistral-large-latest',
          messages: [
            {
              role: 'system',
              content: 'You are an expert automotive diagnostic system. Provide detailed, accurate analysis of car problems based on symptoms, vehicle specifications, and maintenance history.'
            },
            {
              role: 'user',
              content: sanitized_prompt
            }
          ],
          temperature: 0.2,
          max_tokens: 1000
        }.to_json
      )

      if response.code == 200
        JSON.parse(response.body)['choices'][0]['message']['content']
      else
        handle_api_error(StandardError.new("API returned status code #{response.code}: #{response.body}"))
      end
    rescue => e
      handle_api_error(e)
    end
  end
end
