use Rack::Static,
  :urls => ["/js"],
  :root => "client"


def index
  File.open('./index.html', File::RDONLY)
end

run lambda { |env| [200, {'Content-Type' => 'text/html'}, index] }
