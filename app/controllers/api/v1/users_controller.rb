module Api
  module V1
    class UsersController < BaseController
      before_action :set_user, only: [:show, :update, :destroy]

      # GET /api/v1/users
      def index
        @users = policy_scope(User).all
        authorize @users
        render json: @users, each_serializer: UserSerializer
      end

      # GET /api/v1/users/1
      def show
        authorize @user
        render json: @user, serializer: UserSerializer
      end

      # POST /api/v1/users
      def create
        @user = User.new(user_params)
        authorize @user
        
        if @user.save
          render json: @user, status: :created, location: api_v1_user_url(@user), serializer: UserSerializer
        else
          render_errors(@user.errors, :unprocessable_entity)
        end
      end

      # PATCH/PUT /api/v1/users/1
      def update
        authorize @user
        
        if @user.update(user_params)
          render json: @user, serializer: UserSerializer
        else
          render_errors(@user.errors, :unprocessable_entity)
        end
      end

      # DELETE /api/v1/users/1
      def destroy
        authorize @user
        @user.destroy
        head :no_content
      end

      private

      def set_user
        @user = User.find(params[:id])
      end

      def user_params
        params.require(:user).permit(policy(@user || User).permitted_attributes)
      end
    end
  end
end
