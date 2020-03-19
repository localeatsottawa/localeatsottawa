module ApplicationHelper
  def check_icon(value)
    if value
      content_tag :i, '', class: 'fas fa-check-circle success'
    else
      content_tag :i, '', class: 'fas fa-times-circle error'
    end
  end
  
end
