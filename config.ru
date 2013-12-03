use Rack::Static, :urls => ["/game.min.js"], :root => "."

def index
  File.open('index.html', File::RDONLY)
end

run lambda { |env| [200, {'Content-Type' => 'text/html'}, index] }
