module Api
    module V1
        class TagsController < ApplicationController
            skip_before_action :verify_authenticity_token #for access through postman extension
            def index #good
                tags = current_user.tags;
                render json: {status: 'SUCCESS', message:'Loaded tags', data:tags},status: :ok
            end

            def show #good
                tag = Tag.find(params[:id])
                tasks =tag.tasks
                taggings=tag.taggings
                render json: {status: 'SUCCESS', message:'Loaded tag', data:tag, relations:tasks, taggings:taggings},status: :ok
            end

            def create #good
                tag = current_user.tags.build(tag_params)

                if tag.save
                    render json: {status: 'SUCCESS', message:'Saved tag', data:tag},status: :ok 
                else
                    render json: {status: 'Error', message:'Tag not saved',
                    data:tag.errors},status: :unprocessable_entity
                end
            end

            def destroy #good
                tag = Tag.find(params[:id])
                tag.destroy
                render json: {status: 'SUCCESS', message:'Deleted tag', data:tag},status: :ok 

            end

            def update #good
                tag = Tag.find(params[:id])
                if tag.update_attributes(tag_params)
                    render json: {status: 'SUCCESS', message:'Updated tag', data:tag},status: :ok 
                else
                    render json: {status: 'Error', message:'Tag not updated',
                    data:tag.errors},status: :unprocessable_entity
                end

            end

            private

            def tag_params
                params.permit(:name)
            end
        end
    end
end