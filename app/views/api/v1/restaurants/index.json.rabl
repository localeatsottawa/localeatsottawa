collection @restaurants

attributes :id, :name, :phone, :website

child(:locations) do
  attributes :id, 
             :name,
             :address,
             :delivery,
             :skip_the_dishes,
             :uber_eats,
             :door_dash,
             :pickup
end