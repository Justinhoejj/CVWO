module Api
    module V1
        class TasksController < ApplicationController
            skip_before_action :verify_authenticity_token #for access through postman extension
            def index
                tasks = Task.all;
                render json: {status: 'SUCCESS', message:'Loaded tasks', data:tasks},status: :ok
            end

            def show
                task = Task.find(params[:id])
                render json: {status: 'SUCCESS', message:'Loaded task', data:task},status: :ok
            end

            def create
                task = Task.new(task_params)

                if task.save
                    render json: {status: 'SUCCESS', message:'Saved task', data:task},status: :ok 
                else
                    render json: {status: 'Error', message:'Task not saved',
                    data:task.errors},status: :unprocessable_entity
                end
            end

            def destroy
                task = Task.find(params[:id])
                task.destroy
                render json: {status: 'SUCCESS', message:'Deleted task', data:task},status: :ok 

            end

            def update
                task = Task.find(params[:id])
                if task.update_attributes(task_params)
                    render json: {status: 'SUCCESS', message:'Updated task', data:task},status: :ok 
                else
                    render json: {status: 'Error', message:'Task not updated',
                    data:task.errors},status: :unprocessable_entity
                end

            end

            private

            def task_params
                params.permit(:title, :body)
            end
        end
    end
end
