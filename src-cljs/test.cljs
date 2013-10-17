(ns subs)
;; (:require [goog.dom :as dom]
;;           [goog.events :as events]))
;            [clojure.browser.event :as event]
;            [clojure.browser.dom :as dom]))


(declare context)
(declare canvas)
(declare add-tile)

;; (defn draw-rect [x y]
;;   (.beginPath context)
;;   (set! (.-fillStyle context) "#888")
;;   (.fillRect context x y 50 50))

(defn clear-canvas []
  (set! (.-width canvas) (.-width canvas)))


(defn draw-wall [color x y]
  (.beginPath context)
  (set! (.-fillStyle context) color)
  (.moveTo context (* x 10) (* y 10))
  (.lineTo context (+ (* x 10) 10) (* y 10))
  (.lineTo context (+ (* x 10) 10) (+ (* y 10) 10))
  (.lineTo context (* x 10) (+ (* y 10) 10))
  (.closePath context)
  (.fill context))

(def draw-fns
 {:hard-wall (partial draw-wall "blue")
  :soft-wall (partial draw-wall "black")
  :explosion (partial draw-wall "red")})

(def walls
  (list {:x 4 :y 6 :direction :up :length 3 :type :hard-wall}
        {:x 1 :y 1 :direction :right :length 6 :type :soft-wall}))

(defn decompose-wall [wall]
  (if (= 0 (:length wall))
      '()
      (let [x (:x wall)
            y (:y wall)
            [x2 y2] (case (:direction wall)
                      :up [x (+ y 1)]
                      :right [(+ x 1) y])]
        (cons {:x (:x wall) :y (:y wall) :type (:type wall) :wall wall}
              (decompose-wall {:x x2 :y y2
                               :type (:type wall)
                               :direction (:direction wall)
                               :length (- (:length wall) 1)})))))


(defn add-walls [tiles walls]
  (if (empty? walls)
      tiles
      (add-walls (concat (decompose-wall (first walls))
                          tiles)
                 (rest walls))))

(defn add-tile [tile board]
  (let [x (:x tile)
        y (:y tile)
        row (board x)
        new-row (assoc row y tile)]
    (assoc board x new-row)))


(defn make-board
  ([tiles w h]
   (make-board tiles (vec (repeat w (vec (repeat h {}))))))
  ([tiles board]
   (if (empty? tiles)
        board
     (make-board (rest tiles)
                 (add-tile (first tiles)
                           board)))))

(defn render [tiles]
  (doseq [tile tiles]
    ((draw-fns (tile :type)) (tile :x) (tile :y))))

(defn game-loop [frame-count tiles]
  (clear-canvas)
  (render tiles)
  ;; (draw-rect (+ 10 frame-count) 10)
  ;; (when (> 1 frame-count) (js/lololo))
  (.requestAnimationFrame js/window #(game-loop (inc frame-count) tiles)))

(defn main []
  (def canvas (.getElementById js/document "canvas"))
  (def context (.getContext subs/canvas "2d"))

  (set! (.-width canvas) 1000)
  (set! (.-height canvas) 600)

  (let []
    (.log js/console "canvas is" canvas)
    (.log js/console "context is" context)
    (game-loop 0 (add-walls '() walls))))
    ;; (draw-rect 10 10)
    ;; (game-loop 0 (game-board 10 10))))

(.addEventListener js/window "keydown" (fn [event]
                                      (.log js/console (.-keyCode event))))
(defn draw [])
(defn update [])


