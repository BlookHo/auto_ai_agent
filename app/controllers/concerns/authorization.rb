module Authorization
  extend ActiveSupport::Concern

  included do
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  end

  private

  def authorize(record, query = nil)
    super(record, query)
  end

  def user_not_authorized(exception)
    policy_name = exception.policy.class.to_s.underscore
    error_key = exception.query || :not_authorized
    error_message = I18n.t("#{policy_name}.#{error_key}", scope: "pundit", default: :default)
    
    render json: { error: error_message }, status: :forbidden
  end
end
