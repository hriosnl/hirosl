<motion.div
          drag
          dragMomentum={false}
          whileDrag={{ cursor: "grabbing", scale: 1.2 }}
          onDrag={(event, info) => {
            checkProximity(info.point.x, info.point.y);
          }}
          className="cursor-grab"
        >
          <Image
            src="/images/foods/pizza.png"
            alt="pizza"
            width={160}
            height={160}
            className="rounded-3xl bg-white"
            draggable={false}
          />
        </motion.div>
        <motion.div
          drag
          dragMomentum={false}
          whileDrag={{ cursor: "grabbing", scale: 1.2 }}
          onDrag={(event, info) => {
            checkProximity(info.point.x, info.point.y);
          }}
          className="cursor-grab"
        >
          <Image
            src="/images/foods/banana.png"
            alt="banana"
            width={160}
            height={160}
            className="rounded-3xl bg-white"
            draggable={false}
          />
        </motion.div>
        <motion.div
          drag
          dragMomentum={false}
          whileDrag={{ cursor: "grabbing", scale: 1.2 }}
          onDrag={(event, info) => {
            checkProximity(info.point.x, info.point.y);
          }}
          className="cursor-grab"
        >
          <Image
            src="/images/foods/salad.png"
            alt="salad"
            width={160}
            height={160}
            className="rounded-3xl bg-white"
            draggable={false}
          />
        </motion.div>



======================

         if (dropBoxBounds) {
      // Get drag element's center position
      const dragCenterX = info.point.x;
      const dragCenterY = info.point.y;

      console.log("x: ", info.offset.x);
      console.log("y: ", info.offset.y);
      console.log("dragCenterX: ", dragCenterX);
      console.log("dragCenterY: ", dragCenterY);
      console.log(
        "dropBoxBounds.x middle: ",
        dropBoxBounds.x + dropBoxBounds.width / 2
      );
      console.log(
        "dropBoxBounds.y  middle: ",
        dropBoxBounds.y + dropBoxBounds.height / 2
      );
      console.log("\n\n");

      // Get bottom middle of dropBoxRef
      const dropBoxBottomMiddleX = dropBoxBounds.x + dropBoxBounds.width / 2;
      const dropBoxBottomMiddleY = dropBoxBounds.y + dropBoxBounds.height;

      // Calculate the difference (distance)
      const differenceX = dragCenterX - dropBoxBottomMiddleX;
      const differenceY = dragCenterY - dropBoxBottomMiddleY;
      // const distance = Math.sqrt(
      //   differenceX * differenceX + differenceY * differenceY
      // );

      setDifferenceX(differenceX - info.offset.x);
      setDifferenceY(differenceY - info.offset.y);

      // console.log(
      //   `Distance from drag center to dropBox bottom middle: ${distance}px`
      // );
      console.log(
        `X difference: ${differenceX}px, Y difference: ${differenceY}px`
      );
    }