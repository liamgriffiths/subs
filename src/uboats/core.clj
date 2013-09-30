(ns uboats.core
  (:use ring.adapter.jetty)
  (:use ring.util.response)
  (:use ring.middleware.file)
  (:use ring.middleware.resource))

(defn handler [request]
  (file-response "index.html" {:root "resources/public"}))

(def static-files
  (wrap-file handler "resources/public"))

(defn -main []
  (run-jetty static-files {:port 3000}))
