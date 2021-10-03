import { Theme } from "@material-ui/core";
import { MutableRefObject, useEffect, useState } from "react"
import useRect from "./useRect";
    
interface Item {
  text: string
}

const context = document.createElement('canvas').getContext('2d');

const getCssStyle = (element: HTMLElement, prop: string) => {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
}

const getCanvasFontSize = (el = document.body) => {
  const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
  const fontSize = getCssStyle(el, 'font-size') || '16px';
  const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';
    
  return `${fontWeight} ${fontSize} ${fontFamily}`;
}

const getTextWidth = (
    text: string,
    ref: React.RefObject<any>,
  ):number => {
    if (!ref.current?.children[0] && !context)
      return 0;
    context!!.font = getCanvasFontSize(ref.current?.children[0]);
    const metrics = context!!.measureText(text);
    return metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight
  };

const useOverflowWidthList = <T extends Item> (ref: MutableRefObject<HTMLElement>, list: T[], theme: Theme) => {
    const rect = useRect(ref);
    const [filteredList, setFilteredList] = useState(list)
    useEffect(() => {
      if (!ref?.current || rect?.width === 0)
        return;
      const additionalWidth = (theme.chip.borderWidth + theme.chip.textPaddingSides) * 2 + theme.chip.margin;
      let newList: T[]= [] 
      let width:number = 0;

      const initialWidth = rect.width;
      let remainingWidth = initialWidth;
      let listAux = list.sort(i => i.text.length);
      const listLength = listAux.length;
      let counter = 0
      let item: T;
      let hasOverflowItem = false;
      while (remainingWidth > 0 && counter < listLength) {
        item = listAux[counter]
        width = Math.min(getTextWidth(item.text, ref), theme.chip.maxWidth)
        width += additionalWidth;
        
        //Add item if it fits
        if ((remainingWidth - width) >= 0) {
            remainingWidth -= width
            newList.push(item);
            
        }
        //If overflows, sustract the overflowItemWidth as we will insert a new item to the list.
        else if (!hasOverflowItem && (remainingWidth - width) < 0) {
            let overflowItemWidth = getTextWidth('+00',ref) + additionalWidth;
            remainingWidth -= overflowItemWidth;
            hasOverflowItem = true
        }
        counter++;
      }
      if (remainingWidth < 0) {
        newList.sort(i => i.text.length).some(i => {
            width = getTextWidth(i.text,ref) + additionalWidth
            remainingWidth += width;
            newList = newList.filter( n => n !== i);
            return remainingWidth > 0;
        });
      }

      setFilteredList(newList);
    }, [rect, list, theme, ref])
    return filteredList
}
export default useOverflowWidthList