(ns subs)
  ;; (:require [goog.dom :as dom]
  ;;           [goog.events :as events]))
;            [clojure.browser.event :as event]
;            [clojure.browser.dom :as dom]))



(defn draw-rect [x y]
  (.beginPath context)
  (set! (.-fillStyle context) "#888")
  (.fillRect context x y 50 50))

(defn clear-canvas []
  (set! (.-width canvas) (.-width canvas)))


(def walls
  (list {:x 4 :y 6 :direction :up :length 3 :type hard}
        {:x 1 :y 1 :direction :right :length 6 :type soft}))

(defn decompose-wall [wall]
  (if (= 0 (:length wall))
      '()
      (let [x (:x wall)
            y (:y wall)
            [x2 y2] (case (:direction wall)
                      :up [x (+ y 1)]
                      :right [(+ x 1) y])]
        (cons {:x (:x wall) :y (:y wall)}
              (decompose-wall {:x x2 :y y2
                               :type (:type wall)
                               :direction (:direction wall)
                               :length (- (:length wall) 1)})))))

(defn make-board
  ([tiles w h]
   (make-board tiles (new-tiles w h)))
  ([tiles board]
   (if (empty? tiles)
        board
     (make-board (rest tiles)
                 (add-tile (first tiles)
                           board)))))

(defn add-tile [tile board]
  (assoc ((board (tile :x)) (tile :y))




(defn build-tiles [walls tiles]
  (dolist [wall walls]
          (add-wall! wall tiles)))

(defn add-wall! [wall tiles]
  (conj ((tiles (wall :x)) wall :y) :wall wall))

(defn game-loop [frame-count]
  (clear-canvas)
  (draw)
  (update)
  (draw-rect (+ 10 frame-count) 10)
  (.requestAnimationFrame js/window #(game-loop (inc frame-count))))

(defn new-tiles [w h]
 (vec (repeat w (vec (repeat h {})))))

(defn main []
  (def canvas (.getElementById js/document "canvas"))
  (def context (.getContext subs/canvas "2d"))

  (set! (.-width canvas) 1000)
  (set! (.-height canvas) 600)

  (let []
    (.log js/console "canvas is" canvas)
    (.log js/console "context is" context)
    (draw-rect 10 10)
    (game-loop 0 (game-board 10 10))))

(defn draw [])
(defn update [])


