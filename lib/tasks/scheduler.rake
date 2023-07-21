task :time_limit => :environment do
  Client.all.each do |client|
    date_client = client.created_at
    new_date = date_client + 1.days

    if DateTime.now > new_date
      client.destroy
    end
  end
end
