collection @restaurants

attributes :id, :name, :phone, :website

child(:locations) do
  attributes :id, 
             :name,
             :address,
             :pickup,
             :delivery,
             :skip_the_dishes,
             :uber_eats,
             :door_dash,
             :pickup_url,
             :delivery_url,
             :skip_the_dishes_url,
             :uber_eats_url,
             :door_dash_url
end