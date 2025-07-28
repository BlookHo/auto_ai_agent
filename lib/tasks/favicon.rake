namespace :favicon do
  desc "Download and install Rails favicon files"
  task install: :environment do
    require 'open-uri'
    require 'fileutils'

    # Create favicon directory if it doesn't exist
    FileUtils.mkdir_p("public/favicon")

    # Download Rails favicon files
    %w[
      favicon.ico
      favicon-16x16.png
      favicon-32x32.png
      apple-touch-icon.png
    ].each do |filename|
      puts "Downloading #{filename}..."
      url = "https://raw.githubusercontent.com/rails/rails-logo/master/favicon/#{filename}"
      
      begin
        open(url) do |file|
          File.open("public/favicon/#{filename}", "wb") do |f|
            f.write(file.read)
          end
        end
        puts "✓ Successfully downloaded #{filename}"
      rescue => e
        puts "✗ Failed to download #{filename}: #{e.message}"
      end
    end

    puts "\nFavicon files have been installed to public/favicon/"
  end
end
