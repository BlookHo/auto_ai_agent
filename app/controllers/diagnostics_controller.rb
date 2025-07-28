class DiagnosticsController < ApplicationController
  def index
    @diagnostic_sessions = DiagnosticSession.order(created_at: :desc).limit(10)
    @llm_service = LlmService.new
    @providers = @llm_service.list_supported_providers
  end

  def new
    @diagnostic_session = DiagnosticSession.new
    @car_makes = DiagnosticSession.common_car_makes
    @llm_service = LlmService.new
    @providers = @llm_service.list_supported_providers
  end

  def create
    @diagnostic_session = DiagnosticSession.new(diagnostic_session_params)
    
    if @diagnostic_session.save
      # Process with the selected LLM
      @diagnostic_session.llm_provider = params[:llm_provider]&.to_sym || :openai
      
      # Generate diagnosis using the selected LLM
      if @diagnostic_session.generate_diagnosis
        redirect_to diagnostic_path(@diagnostic_session), notice: 'Diagnosis generated successfully!'
      else
        redirect_to diagnostic_path(@diagnostic_session), alert: 'Failed to generate diagnosis. Please try again.'
      end
    else
      @car_makes = DiagnosticSession.common_car_makes
      @llm_service = LlmService.new
      @providers = @llm_service.list_supported_providers
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @diagnostic_session = DiagnosticSession.find(params[:id])
  end
  
  private
  
  def diagnostic_session_params
    params.require(:diagnostic_session).permit(:vehicle_make, :vehicle_model, :vehicle_year, :symptoms)
  end
end
