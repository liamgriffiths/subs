(ns subs
  (:require [goog.dom :as dom]
            [goog.events :as events]))
;            [clojure.browser.event :as event]
;            [clojure.browser.dom :as dom]))

(defn drawWall [context]
  (.beginPath context)
  (set! (.-fillStyle context) "#888")
  (.fillRect context 5 5 50 70))


;  context.moveTo(this.position.x * TILESIZE, this.position.y * TILESIZE);
;  context.lineTo(this.position.x * TILESIZE + TILESIZE, this.position.y * TILESIZE);
;  context.lineTo(this.position.x * TILESIZE + TILESIZE, this.position.y * TILESIZE + TILESIZE);
;  context.lineTo(this.position.x * TILESIZE, this.position.y * TILESIZE + TILESIZE);
;  context.closePath();
;  context.fill();


(defn main []
  (let [canvas (.getElementById js/document "canvas")
        context (.getContext canvas "2d")]
    (.log js/console "canvas is" canvas)
    (.log js/console "context is" context)
    (drawWall context)))
    




