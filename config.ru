use Rack::Static,
  :urls => ["/js"],
  :root => "public"


def index
  File.open('public/index.html', File::RDONLY)
end

run lambda { |env| [ 200, {'Content-Type' => 'text/html'}, index ] }
