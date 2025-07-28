module Api
  class DiagnosticsController < ApplicationController
    skip_before_action :verify_authenticity_token
    
    def index
      @diagnostics = DiagnosticSession.order(created_at: :desc).limit(10)
      render json: @diagnostics
    end
    
    def show
      @diagnostic = DiagnosticSession.find(params[:id])
      render json: @diagnostic
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Diagnostic not found' }, status: :not_found
    end
    
    def create
      @diagnostic = DiagnosticSession.new(diagnostic_params)
      
      if @diagnostic.save
        # Simulate AI processing
        process_diagnostic_async(@diagnostic.id)
        
        render json: { 
          id: @diagnostic.id,
          message: 'Diagnostic session created. Processing your request...',
          status: 'processing'
        }, status: :created
      else
        render json: { errors: @diagnostic.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    private
    
    def diagnostic_params
      params.require(:diagnostic).permit(:symptoms, :vehicle_make, :vehicle_model, :vehicle_year)
    end
    
    def process_diagnostic_async(diagnostic_id)
      # In a real app, you would use ActiveJob or Sidekiq for background processing
      Thread.new do
        sleep(2) # Simulate processing time
        
        diagnostic = DiagnosticSession.find(diagnostic_id)
        # Simulate AI analysis
        diagnostic.update(
          diagnosis: "Based on the symptoms you've described (#{diagnostic.symptoms}), I recommend checking the following:\n\n" +
                    "1. The issue might be related to the engine or transmission system.\n" +
                    "2. It's recommended to check for any error codes using an OBD2 scanner.\n" +
                    "3. Consider having a professional mechanic inspect the vehicle for a more accurate diagnosis.",
          status: 'completed'
        )
      end
    end
  end
end
