class AnthropicClient < BaseLlmClient
  def initialize
    require 'httparty'
    @api_key = ENV['ANTHROPIC_API_KEY']
    @api_url = 'https://api.anthropic.com/v1/messages'
  end

  def generate_response(prompt)
    sanitized_prompt = sanitize_prompt(prompt)

    begin
      response = HTTParty.post(
        @api_url,
        headers: {
          'Content-Type' => 'application/json',
          'x-api-key' => @api_key,
          'anthropic-version' => '2023-06-01'
        },
        body: {
          model: 'claude-3-opus-20240229',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: sanitized_prompt
            }
          ],
          system: "You are an expert automotive diagnostic system. Provide detailed, accurate analysis of car problems based on symptoms, vehicle specifications, and maintenance history."
        }.to_json
      )

      if response.code == 200
        JSON.parse(response.body)['content'].first['text']
      else
        handle_api_error(StandardError.new("API returned status code #{response.code}: #{response.body}"))
      end
    rescue => e
      handle_api_error(e)
    end
  end
end
