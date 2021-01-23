module Api
    module V1
        class SubtasksController < ApplicationController
            skip_before_action :verify_authenticity_token #for access through postman extension

            def create
                subtask = Subtask.new(subtask_params)

                if subtask.save
                    render json: {status: 'SUCCESS', message:'Saved subtask', data:subtask},status: :ok 
                else
                    render json: {status: 'Error', message:'Subtask not saved',
                    data:subtask.errors},status: :unprocessable_entity
                end
            end

            def destroy
                subtask = Subtask.find(params[:id])
                subtask.destroy
                render json: {status: 'SUCCESS', message:'Deleted subtask', data:subtask},status: :ok 

            end

            def update
                subtask = Subtask.find(params[:id])
                if subtask.update_attributes(subtask_params)
                    render json: {status: 'SUCCESS', message:'Updated subtask', data:subtask},status: :ok 
                else
                    render json: {status: 'Error', message:'subtask not updated',
                    data:subtask.errors},status: :unprocessable_entity
                end

            end

            private

            def subtask_params
                params.permit(:name, :done, :task_id,)
            end
        end
    end
end