module Api
    module V1
        class TaggingsController < ApplicationController
            skip_before_action :verify_authenticity_token #for access through postman extension
            
            def show
                tagging = Tagging.find(params[:id])
                tag = tagging.tag
                render json: {status: 'SUCCESS', message:'Loaded tagging', data:tagging, tag:tag},status: :ok
            end

            def create
                tagging = Tagging.new(tagging_params)

                if tagging.save
                    render json: {status: 'SUCCESS', message:'Association established', data:tagging},status: :ok 
                else
                    render json: {status: 'Error', message:'Association failed to established',
                    data:tagging.errors},status: :unprocessable_entity
                end
            end

            def destroy
                tagging = Tagging.find(params[:id])
                tagging.destroy
                render json: {status: 'SUCCESS', message:'Deleted task', data:tagging},status: :ok 

            end
            private

            def tagging_params
                params.permit(:task_id, :tag_id)
            end
        end
    end
end