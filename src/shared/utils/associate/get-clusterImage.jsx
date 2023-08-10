export const getClusterImage = (clusterCode) => {
    let clusterImageName;
    switch (clusterCode) {
        case "cluster_1":
            clusterImageName = "tough_terrain.png"
            break;
        case "cluster_2":
            clusterImageName = "builders_beware.png"
            break;
        case "cluster_3":
            clusterImageName = "refined_wines.png"
            break;
        case "cluster_4":
            clusterImageName = "thrifty_finds.png"
            break;
        case "cluster_5":
            clusterImageName = "boom_towns.png"
            break;
        default:
            //clusterImageName = "boom_towns.png"
            break;
    }
    return clusterImageName
}