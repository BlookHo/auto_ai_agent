class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :role, :created_at, :updated_at
  
  # Only include sensitive information for the current user
  def attributes(*args)
    hash = super
    # Remove sensitive information unless it's the current user
    unless scope && object.id == scope.id
      hash.delete(:email)
    end
    hash
  end
end
