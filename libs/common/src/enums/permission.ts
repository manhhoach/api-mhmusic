import { AlbumPermission } from "./album.permission";
import { SongPermission } from "./song.permission";

type Permission = AlbumPermission | SongPermission

const Permission = {
    ...AlbumPermission,
    ...SongPermission
}

export default Permission

