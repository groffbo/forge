import grass from './textures/grass-block.webp';
import dirt from './textures/dirt.webp';
import stone from './textures/stone.webp';
import deepslate from './textures/deepslate.webp';
import bedrock from './textures/bedrock.webp';

export default function MinecraftScroll() {

  const sectionStyle = (texture: string) => ({
    backgroundImage: `url(${texture})`,
    backgroundRepeat: 'repeat',
    backgroundSize: '64px 64px',
    imageRendering: 'pixelated' as const,
  });

  return (
    <div>
    <div className="w-full min-h-[50vh] bg-[#87CEEB] relative overflow-x-hidden"></div>
      <section style={sectionStyle(grass.src)} className="h-16 flex items-center justify-center">
      </section>

      <section style={sectionStyle(dirt.src)} className="h-[100vh] flex items-center justify-center">
      </section>

      <section style={sectionStyle(stone.src)} className="h-[100vh] flex items-center justify-center">
      </section>

      <section style={sectionStyle(deepslate.src)} className="h-[100vh] flex items-center justify-center">   
      </section>

      <section style={sectionStyle(bedrock.src)} className="h-16 flex items-center justify-center">
      </section>
      </div>
  );
}
