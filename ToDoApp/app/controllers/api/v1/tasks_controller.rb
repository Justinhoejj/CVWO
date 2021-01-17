module Api
    module V1
        class TasksController < ApplicationController
            skip_before_action :verify_authenticity_token #for access through postman extension
            def index #good
                tasks = current_user.tasks
                render json: {status: 'SUCCESS', message:'Loaded tasks', data:tasks},status: :ok
            end

            def show #good
                task = Task.find(params[:id])
                tags = task.tags
                taggings = task.taggings
                subtasks= task.subtasks
                if current_user.id == task.user_id
                render json: {status: 'SUCCESS', message:'Loaded task', data:task, relations:tags, taggings:taggings, subtasks:subtasks},status: :ok
                else
                end
            end

            def create #good
                task = current_user.tasks.build(task_params)

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
