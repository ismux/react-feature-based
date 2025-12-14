type HeaderProps = {
    bgcolor: string,
    textcolor: string,
    text: string
}

export function Header({ bgcolor, textcolor, text } : HeaderProps) {
  return (
      <header className={`bg-${bgcolor}-600 py-8 max-h-72`}>
          <h1 className={`uppercase text-center 
                    font-black text-4xl text-${textcolor}`}>
              {text}
          </h1>
      </header>
  )
}