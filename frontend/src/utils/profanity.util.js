import leoProfanity from 'leo-profanity'

let isProfanityInitialized = false

export const initProfanity = (languages = ['ru', 'en']) => {
  if (isProfanityInitialized) {
    return leoProfanity
  }

  if (!Array.isArray(languages) || languages.length === 0) {
    leoProfanity.loadDictionary()
    isProfanityInitialized = true

    return leoProfanity
  }

  const [baseLanguage, ...additionalLanguages] = languages

  leoProfanity.loadDictionary(baseLanguage)

  additionalLanguages.forEach(language => {
    leoProfanity.add(leoProfanity.getDictionary(language))
  })

  isProfanityInitialized = true

  return leoProfanity
}

export { leoProfanity }