use Rack::Static, :urls => ["/client", "/shared"], :root => "."

def index
  File.open('index.html', File::RDONLY)
end

run lambda { |env| [200, {'Content-Type' => 'text/html'}, index] }
