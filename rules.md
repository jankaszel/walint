# Web Annotation Protocol (WAP) Requirements

Short, abstract version of the [WAP requirements](https://www.w3.org/TR/annotation-protocol/).


## Annotations

must: GET, HEAD, OPTIONS

GET, HEAD, OPTIONS:
- should: use HTTPS
- must: return a Link header
  - must: Link with target IRI: http://www.w3.org/ns/ldp#Resource, rel = type
  - may: Link with target IRI: http://www.w3.org/ns/oa#Annotation, rel = type
- must: advertise supported methods in the Allow header

GET, HEAD:
- must: include an ETag header
- must: if content negotiation is supported, include a Vary header with an Accept value

GET:
- must: serve annotations
  - must: description of that container in JSON-LD representation
    - must: application/ld+json media type
    - should: respective profile: application/ld+json; profile="http://www.w3.org/ns/anno.jsonld"
  - should: Turtle
  - may: other formats

POST:
- must: serialize annotation as JSON-LD in request body
- must: assign an IRI to the annotation in the `id` property, even if it already has one provided
- must: assign an IRI that is the IRI of the container with an additional component added
- must: maintain a `canonical` property without change
- must: respond with a 201 Created response
- must: have aLocation header with the annotation's new IRI
- should: send all known information about the annotation
- should: include any associated IRIs
- should: use the WA JSON-LD profile
- should: use HTTPS IRIs when assigning if these resources are able to be retrieved individually
- should: copy the `id` property to `via` if specified before creation
- should: use the suggested IRI from the Slug header, but *may* ignore it
- may: reject profiles other than WA profile
- may: reject content that is not considered an annotation according to the WA spec
- may: assign IRIs to any resource or blank node in the annotation
- may: add information to the information, such as creating agent, creation time, additional times
- may: suggest the annotation IRI path segment via the Slug header

PUT:
- must: return a 200 OK status with the annotation body according to the Content-Type requested
- must: return the new annotation state
- should: support updating annotations via PUT requests
- should: use the If-Match header with an ETag value to avoid collisions
- should: reject update requests that modify `canonical` or `via` properties
- may: support PATCH requests to only update changed fields

DELETE:
- must: return a 204 status if deletion has been successful
- must: remove respective annotation from the container it was created in
- should: support deletion of annotations
- should: respect If-Match headers
- should: not re-use the deleted annotation's IRI for subsequent annotations
- may: have an empty response body


## Collections

must: GET, HEAD, OPTIONS

GET, HEAD, OPTIONS:
- should use HTTP 200
- should: advertise supported methods in the Allow header
  - may: also be included on any other responses
- must: return a Link header
  - must: advertise its type by including a link with rel for its Container Type
  - must: advertise that it imposes Annotation protocol specific constraints  (ldp#constrainedBy, TR/annotation-protocol)
- should: include an Accept-Post header if annotations can be created

GET, HEAD:
- must: include an ETag header
  - should: be used by clients when updating the container by including it in an If-Match request header
- must: include a Vary header that includes Accept if server supports content negotiation by format or JSON-LD profile 

GET:
- must: description of that container
  - must: JSON-LD
  - should: Turtle
  - may: other formats
  - should use LDP context (ns/ldp.jsonld) and WA profile and context ("unless the request would determine otherwise")
- must: return JSON-LD representation of that container if the Accept header is absent

TODO: Container representations (§4.2)

TODO: Annotation pages (§4.3)

TODO: Discovery of annotation containers (§4.4)


## Recommended Exit Criteria

Recommended criteria will be marked with a paragraph character (§). I will add further criteria/steps in order to evaluate all should/must conditions.

- § HTTP GET of an Annotation
- § HTTP GET of an Annotation Collection
- § HTTP GET of an Annotation Collection Page, with embedded Annotations
- § HTTP GET of an Annotation Collection Page, without embedded Annotations
- § POST of an Annotation to an Annotation Collection
- § POST of an Annotation to an Annotation Collection, with a Slug to suggest the IRI
- § PUT of an Annotation to update an existing Annotation in an Annotation Collection
- § DELETE of an Annotation
- POST of an Annotation with the slug specified before (should fail)

