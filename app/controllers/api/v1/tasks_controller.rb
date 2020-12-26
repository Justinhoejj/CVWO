module Api
    module V1
        class TasksController < ApplicationController
            skip_before_action :verify_authenticity_token #for access through postman extension
            def index #good
                tasks = Task.all;
                render json: {status: 'SUCCESS', message:'Loaded tasks', data:tasks},status: :ok
            end

            def show #good
                task = Task.find(params[:id])
                tags = task.tags
                taggings = task.taggings
                render json: {status: 'SUCCESS', message:'Loaded task', data:task, relations:tags, taggings:taggings},status: :ok
            end

            def create #good
                task = Task.new(task_params)

                if task.save
                    render json: {status: 'SUCCESS', message:'Saved task', data:task},status: :ok 
                else
                    render json: {status: 'Error', message:'Task not saved',
                    data:task.errors},status: :unprocessable_entity
                end
            end

            def destroy #good
                task = Task.find(params[:id])
                task.destroy
                render json: {status: 'SUCCESS', message:'Deleted task', data:task},status: :ok 

            end

            def update #good
                task = Task.find(params[:id])
                if task.update_attributes(task_params)
                    render json: {status: 'SUCCESS', message:'Updated task', data:task},status: :ok 
                else
                    render json: {status: 'Error', message:'Task not updated',
                    data:task.errors},status: :unprocessable_entity
                end

            end

            private

            def task_params #good
                params.permit(:title, :body, :done, :due)
             end
        end
    end
end
