class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.where(id: user.id)
      end
    end
  end

  def index?
    user.admin?
  end

  def show?
    user.admin? || user == record
  end

  def create?
    user.admin?
  end

  def update?
    user.admin? || user == record
  end

  def destroy?
    return false if user == record # Prevent users from deleting themselves
    user.admin?
  end

  def permitted_attributes
    if user.admin?
      [:email, :password, :password_confirmation, :role]
    else
      [:email, :password, :password_confirmation]
    end
  end
end
