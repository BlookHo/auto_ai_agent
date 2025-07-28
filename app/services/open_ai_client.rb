class OpenAiClient < BaseLlmClient
  def initialize
    require 'ruby/openai'
    @client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
  rescue LoadError
    Rails.logger.error("OpenAI gem not properly loaded")
    raise "Failed to initialize OpenAI client"
  end

  def generate_response(prompt)
    sanitized_prompt = sanitize_prompt(prompt)

    response = @client.chat(
      parameters: {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an expert automotive diagnostic system. Provide detailed, accurate analysis of car problems based on symptoms, vehicle specifications, and maintenance history." },
          { role: "user", content: sanitized_prompt }
        ],
        temperature: 0.3,
        max_tokens: 1000
      }
    )

    response.dig("choices", 0, "message", "content")
  rescue => e
    handle_api_error(e)
  end
end
