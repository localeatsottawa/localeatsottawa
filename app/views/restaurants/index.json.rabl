collection @restaurants

attributes :id, :name, :phone, :website

child(:locations) do
  attributes :id, 
             :name,
             :address,
             :delivery,
             :delivery_url,
             :skip_the_dishes,
             :skip_the_dishes_url,
             :uber_eats,
             :uber_eats_url,
             :door_dash,
             :door_dash_url,
             :pickup,
             :pickup_url
end