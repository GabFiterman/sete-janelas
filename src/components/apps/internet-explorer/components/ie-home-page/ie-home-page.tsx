import { ITEMS_MAP_ALL } from '@/constants';
import { type FileSystemItem } from '@/constants';
import { useInternetExplorer } from '../../use-internet-explorer';

function IeHomePage() {
  const { navigateToUrl } = useInternetExplorer();
  const projects: FileSystemItem[] = [
    ITEMS_MAP_ALL['C:/USUARIOS/FITERMAN/PROJETOS/CHALLENGELETT/CHALLENGELETT.HTML'],
    ITEMS_MAP_ALL['C:/USUARIOS/FITERMAN/PROJETOS/LOCAWEB/LOCAWEB.HTML'],
    ITEMS_MAP_ALL['C:/USUARIOS/FITERMAN/PROJETOS/LEAFLETZEN/LEAFLETZEN.HTML'],
  ];

  return (
    <div className="ie-home-page">
      {projects?.length > 0 &&
        projects.map((item, index) => {
          return (
            <div
              className="project-item"
              key={index}
              onMouseDown={() => navigateToUrl(item.uri)}
              style={{ backgroundImage: `url(${item.miniature})` }}
            >
              <span>{item.label}</span>
            </div>
          );
        })}
    </div>
  );
}

export default IeHomePage;
