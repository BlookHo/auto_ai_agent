class LlamaClient < BaseLlmClient
  def initialize
    require 'httparty'
    @api_key = ENV['LLAMA_API_KEY']
    @api_url = 'https://api.together.xyz/v1/completions'
  end

  def generate_response(prompt)
    sanitized_prompt = sanitize_prompt(prompt)
    system_message = "You are an expert automotive diagnostic system. Provide detailed, accurate analysis of car problems based on symptoms, vehicle specifications, and maintenance history."
    
    formatted_prompt = "<s>[INST] #{system_message} [/INST]</s>\n<s>[INST] #{sanitized_prompt} [/INST]"

    begin
      response = HTTParty.post(
        @api_url,
        headers: {
          'Content-Type' => 'application/json',
          'Authorization' => "Bearer #{@api_key}"
        },
        body: {
          model: 'meta-llama/Llama-3-70b-chat-hf',
          prompt: formatted_prompt,
          temperature: 0.2,
          max_tokens: 1000,
          top_p: 0.7
        }.to_json
      )

      if response.code == 200
        JSON.parse(response.body)['choices'][0]['text']
      else
        handle_api_error(StandardError.new("API returned status code #{response.code}: #{response.body}"))
      end
    rescue => e
      handle_api_error(e)
    end
  end
end
