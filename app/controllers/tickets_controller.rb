class TicketsController < ApplicationController
  load_and_authorize_resource

  def index
    @tickets = @tickets.reverse_chronological
  end

  def show
  end

  def new
    @ticket.submitted_by_email = current_user.try(:email)
  end

  def edit
  end

  def create
    @ticket.status = params[:ticket][:status] || 'open'
    
    if @ticket.save
      if admin?
        redirect_to @ticket, notice: 'Ticket was successfully created.'
      else
        redirect_to thank_you_tickets_url, notice: 'Ticket was successfully created.'
      end
    else
      render :new
    end
  end

  def update
    if @ticket.update(ticket_params)
      redirect_to @ticket, notice: 'Ticket was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @ticket.destroy
    redirect_to tickets_url, notice: 'Ticket was successfully destroyed.'
  end

  def thank_you
  end

  private
    def ticket_params
      params.require(:ticket).permit(:title, :body, :status, :submitted_by_name, :submitted_by_email, :user_id)
    end
end
