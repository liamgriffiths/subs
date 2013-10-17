(ns newtest)
(defn decompose-wall [wall]
  (println "decomposing " wall)
  (if (= 0 (:length wall))
      '()
      (let [x (:x wall)
            y (:y wall)
            [x2 y2] (case (:direction wall)
                      :up [x (+ y 1)]
                      :right [(+ x 1) y])]
        (cons {:x (:x wall) :y (:y wall)}
              (decompose-wall {:x x2 :y y2
                               :direction (:direction wall)
                               :length (- (:length wall) 1)})))))


(defn add-tile [tile board]
  (let [x (:x tile)
        y (:y tile)
        row (board x)
        new-row (assoc row y tile)]
    (assoc board x new-row)))
    
(defn new-tiles [w h]
 (vec (repeat w (vec (repeat h {})))))

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
  (let [x (:x tile)
        y (:y tile)
        row (board x)
        new-row (assoc row y tile)]
    (assoc board x new-row)))



