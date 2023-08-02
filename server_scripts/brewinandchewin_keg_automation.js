// Brewin' and Chewin' Keg automation script
// By V972 

// For Forge 1.18.2
// put into 'server_scripts' folder

// Special thanks to @chiefarug over at KubeJS Discord server 
// for the help with getting under the hood of the mod

// priority: 1

onEvent('block.left_click', (event) => {
    if (event.item.id != 'minecraft:air' && 
        !event.player.crouching && !event.player.creativeMode &&                        // disables script in creative and for shift-left-clicking/holding
        event.block.id == 'brewinandchewin:keg' && event.facing != Direction.DOWN) {    // <- filters out second event firing when stopping l-clicking

        let inventory = event.block.entity.getInventory();

        // insert itemstack from hand into recipe slots one slot at a time by clicking on top
        // if no empty slots, add to slot w/ same item and lowest count, provided it can stack more
        if(event.facing == Direction.UP) {
            let firstEmptySlot = -1;
            let firstSameSlot = -1;
            let sameSlotItemStackJS;

            for (let index = 0; index < 4; index++) { // iterate over items in ingredients slots
                let itemStackJS = inventory.getStackInSlot(index).asKJS();

                // determine first empty slot if any
                if (firstEmptySlot == -1 && itemStackJS.isEmpty()) {
                    firstEmptySlot = index;
                }

                // determine first slot w/ same item and least count if any
                if (itemStackJS.id == event.item.id) {
                    if (firstSameSlot == -1) {
                        firstSameSlot = index;
                        sameSlotItemStackJS = itemStackJS;
                    }
                    else if(itemStackJS.count < sameSlotItemStackJS.count) {
                        firstSameSlot = index;
                        sameSlotItemStackJS = itemStackJS;
                    }
                }
            }

            // insert into that slot
            if (firstEmptySlot > -1) {
                inventory.setStackInSlot(firstEmptySlot, event.item.withCount(event.item.count).itemStack);
                event.item.count = 0;
            }
            // if not, add to the slot with same item type with least amout of items
            // if any
            else if (firstSameSlot > -1){
                let maxStack = sameSlotItemStackJS.itemStack.maxStackSize;
                let countUntilFullStack = Math.min(Math.max(maxStack - sameSlotItemStackJS.count, 0), maxStack);
                let combinedCount = sameSlotItemStackJS.count + event.item.count;
                    
                if (combinedCount <= maxStack) {
                    inventory.setStackInSlot(firstSameSlot, event.item.withCount(combinedCount).itemStack);
                    event.item.count = 0;
                }
                else {
                    inventory.setStackInSlot(firstSameSlot, event.item.withCount(maxStack).itemStack);
                    event.item.count -= countUntilFullStack;
                }
            }
        }

        // insert itemstack from hand into the top slot by clicking on front or back
        // same stacking logic, except there's only one slot :shrugs:
        if (event.block.properties.facing == event.facing.getName() ||
            event.block.properties.facing == event.facing.opposite.getName()) {
            let topSlotItem = inventory.getStackInSlot(4).asKJS();
                    
            if (topSlotItem.id == "minecraft:air") {
                inventory.setStackInSlot(4, event.item.withCount(event.item.count).itemStack);
                event.item.count = 0;
            }
            else if (topSlotItem.id == event.item.id) {
                let maxStack = topSlotItem.itemStack.maxStackSize;
                let countUntilFullStack = Math.min(Math.max(maxStack - topSlotItem.count, 0), maxStack);
                let combinedCount = topSlotItem.count + event.item.count;
                        
                if (combinedCount <= maxStack) {
                    inventory.setStackInSlot(4, event.item.withCount(combinedCount).itemStack);
                    event.item.count = 0;
                }
                else {
                    inventory.setStackInSlot(4, event.item.withCount(maxStack).itemStack);
                    event.item.count -= countUntilFullStack;
                }
            }
        }
    }
});
