module UrlHelper
  def ensure_url_has_protocol(url)
    if ( url !~ /^https?:\/\// && !url.to_s.strip.empty? )
      url = "http://" + url
    end
  end
end