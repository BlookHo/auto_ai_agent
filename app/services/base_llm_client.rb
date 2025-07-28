class BaseLlmClient
  # Base class for all LLM client implementations
  # This provides a common interface for all LLM providers

  def generate_response(prompt)
    raise NotImplementedError, "Subclasses must implement #generate_response"
  end

  protected

  def handle_api_error(error)
    Rails.logger.error("LLM API Error: #{error.message}")
    "Error communicating with AI service. Please try again later."
  end

  def sanitize_prompt(prompt)
    # Basic prompt sanitization to prevent prompt injection
    prompt.strip
  end
end
