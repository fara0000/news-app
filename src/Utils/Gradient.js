export const getColor = () => {
    const colors = [
        {
            color1: "#DE6262",
            color2: "#FFB88C"
        },
        {
            color1: "#f857a6",
            color2: "#ff5858"
        },
        {
            color1: "#5C258D",
            color2 :"#4389A2"
        },
        {
            color1 :"#134E5E",
            color2: "#71B280"
        },
        {
            color1: "#4776E6",
            color2: "#8E54E9"
        }
    ]

    
    let gradient = colors[Math.floor(Math.random() * colors.length)];

    return gradient;
}