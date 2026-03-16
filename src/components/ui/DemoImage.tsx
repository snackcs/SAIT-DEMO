import NextImage, { ImageProps } from 'next/image'

/**
 * Обёртка над next/image для демо-сайта.
 * Добавляет плашку «Ваше фото» поверх каждого изображения.
 * Работает только с fill-изображениями (родитель обязан быть relative).
 */
export default function DemoImage(props: ImageProps) {
  return (
    <>
      <NextImage {...props} />
      <div className="absolute inset-0 flex items-end justify-start p-3 pointer-events-none z-10">
        <span className="bg-black/50 text-white text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm tracking-wide">
          Ваше фото
        </span>
      </div>
    </>
  )
}
