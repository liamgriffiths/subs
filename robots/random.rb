sleep 1

while true do
  actions = ['left',
             'right',
             'up',
             'down',
             'mine']

  $stdout.puts actions.sample
  $stdout.flush

  sleep(Random.rand(0..1.0))
end
