use Rack::Static,
  :urls => ["/js"],
  :root => "resources/public"


def index
  File.open('resources/public/index.html', File::RDONLY)
end

run lambda { |env| [ 200, {'Content-Type' => 'text/html'}, index ] }
