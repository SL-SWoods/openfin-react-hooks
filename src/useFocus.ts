import {_Window} from "openfin/_v2/api/window/window";
import {useEffect, useState} from "react";

export default (win: _Window = fin.Window.getCurrentSync()) => {
    const [isFocused, setIsFocused] = useState<boolean>();

    useEffect(() => {
        const setFocused = () => setIsFocused(true);
        win.addListener("focused", setFocused);

        return () => {
            win.removeListener("focused", setFocused);
        };
    }, [win.identity.uuid, win.identity.name]);

    useEffect(() => {
        const setBlurred = () => setIsFocused(false);
        win.addListener("blurred", setBlurred);

        return () => {
            win.removeListener("blurred", setBlurred);
        };
    }, [win.identity.uuid, win.identity.name]);

    // bringToFront, isShowing, setAsForground, blur, focus

    return [isFocused, (newFocus: boolean) => newFocus ? win.focus() : win.blur()];
};
