module Api
  module V1
    class LlmSettingsController < BaseController
      before_action :authenticate_request
      before_action :set_llm_setting, only: [:show, :update, :destroy]
      
      # Skip CSRF protection for API requests
      skip_before_action :verify_authenticity_token
      
      # GET /api/v1/settings/llm
      def index
        settings = current_user.llm_settings.map(&:to_h)
        render json: settings
      end

      # GET /api/v1/settings/llm/:provider
      def show
        if @llm_setting
          render json: @llm_setting.to_h
        else
          render json: { error: 'Settings not found' }, status: :not_found
        end
      end

      # POST /api/v1/settings/llm
      def create
        @llm_setting = current_user.llm_settings.new(llm_setting_params)
        
        if @llm_setting.save
          render json: @llm_setting.to_h, status: :created
        else
          render json: { errors: @llm_setting.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/settings/llm/:provider
      def update
        if @llm_setting.nil?
          @llm_setting = current_user.llm_settings.new(llm_setting_params.merge(provider: params[:provider]))
          status = :created
        else
          @llm_setting.assign_attributes(llm_setting_params)
          status = :ok
        end

        if @llm_setting.save
          render json: @llm_setting.to_h, status: status
        else
          render json: { errors: @llm_setting.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/settings/llm/:provider
      def destroy
        if @llm_setting
          @llm_setting.destroy
          head :no_content
        else
          render json: { error: 'Settings not found' }, status: :not_found
        end
      end

      private

      def set_llm_setting
        @llm_setting = current_user.llm_settings.find_by(provider: params[:provider])
      end

      def llm_setting_params
        params.require(:llm_setting).permit(:api_key, :model, :temperature).merge(provider: params[:provider])
      end
    end
  end
end
