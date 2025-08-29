class UserMailer < ApplicationMailer
  default from: 'no-reply@autoaiagent.com'

  def password_reset(user, reset_url)
    @user = user
    @reset_url = reset_url
    
    mail to: @user.email, subject: 'Password Reset Instructions'
  end
end
