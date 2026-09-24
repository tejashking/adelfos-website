import { servicesA } from "./services-a";
import { servicesB } from "./services-b";

/**
 * @typedef {Object} Service
 * @property {string} slug
 * @property {string} n
 * @property {string} title
 * @property {string} shortDescription
 * @property {string[]} heroLine
 * @property {string} heroDescription
 * @property {string} image
 * @property {string} visual
 * @property {{title:string, body:string}} problem
 * @property {{title:string, body:string}[]} approach
 * @property {string[]} capabilities
 * @property {{title:string, body:string}[]} process
 * @property {string[]} deliverables
 * @property {string[]} industries
 * @property {{q:string, a:string}[]} faq
 * @property {string[]} relatedServices
 * @property {string[]} relatedCaseStudies
 * @property {string} seoTitle
 * @property {string} seoDescription
 */

/** @type {Service[]} */
export const services = [...servicesA, ...servicesB];

export const getService = (slug) => services.find((s) => s.slug === slug);
export const getServices = (slugs = []) => slugs.map(getService).filter(Boolean);
