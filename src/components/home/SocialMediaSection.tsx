'use client';

import { motion } from 'framer-motion';
import { Linkedin, Youtube } from 'lucide-react';
import styles from './SocialMediaSection.module.css';
import { useTranslation } from '../../components/ui/language-selector';

export function SocialMediaSection() {
  const { t } = useTranslation();
  return (
    <section className={styles.socialMediaSection}>
      <div className={styles.container}>
        <motion.h3
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('social.title', 'Connect with us')}
        </motion.h3>

        <motion.div
          className={styles.iconsContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href="https://www.linkedin.com/company/tpack-fr/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.iconWrapper}>
              <Linkedin size={28} />
            </div>
            <span className={styles.iconLabel}>{t('social.linkedin', 'LinkedIn')}</span>
          </motion.a>

          <motion.a
            href="https://www.youtube.com/@Tecnimodern"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`${styles.iconWrapper} ${styles.youtubeIcon}`}>
              <Youtube size={28} />
            </div>
            <span className={styles.iconLabel}>{t('social.youtube', 'YouTube')}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
